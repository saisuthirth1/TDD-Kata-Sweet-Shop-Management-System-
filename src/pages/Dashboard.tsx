import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SweetCard } from "@/components/SweetCard";
import { LoyaltyDisplay } from "@/components/LoyaltyDisplay";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Loader2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Sweet {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  quantity: number;
  image_url: string | null;
}

interface LoyaltyPoints {
  points: number;
  lifetime_points: number;
}

const Dashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints>({ points: 0, lifetime_points: 0 });
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "candy",
    description: "",
    price: "",
    quantity: "",
    image_url: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsAuthenticated(true);
    setIsUserAdmin(true); // For demo purposes, everyone is admin
  }, []);

  useEffect(() => {
    fetchSweets();
  }, [isAuthenticated]);

  useEffect(() => {
    filterSweets();
  }, [searchQuery, categoryFilter, priceFilter, sweets]);

  const fetchSweets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/sweets');
      if (!response.ok) throw new Error('Failed to fetch sweets');
      const data = await response.json();
      setSweets(data);
      setFilteredSweets(data);
    } catch (error) {
      console.error('Error loading sweets:', error);
      toast({
        title: "Error",
        description: "Failed to load sweets. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSweets = async () => {
    try {
      let url = 'http://localhost:3000/api/sweets/search?';
      const params = new URLSearchParams();

      if (searchQuery) params.append('name', searchQuery);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (priceFilter !== 'all') {
        switch(priceFilter) {
          case 'low':
            params.append('maxPrice', '50');
            break;
          case 'medium':
            params.append('minPrice', '50');
            params.append('maxPrice', '100');
            break;
          case 'high':
            params.append('minPrice', '100');
            break;
        }
      }

      const response = await fetch(url + params);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setFilteredSweets(data);
    } catch (error) {
      console.error('Search error:', error);
      // Keep the current filtered state if search fails
      filterSweetsLocally();
    }
  };

  // Fallback to local filtering if API call fails
  const filterSweetsLocally = () => {
    let filtered = [...sweets];

    if (searchQuery) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(sweet => sweet.category === categoryFilter);
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter(sweet => {
        if (priceFilter === "low") return sweet.price < 50;
        if (priceFilter === "medium") return sweet.price >= 50 && sweet.price < 100;
        if (priceFilter === "high") return sweet.price >= 100;
        return true;
      });
    }

    setFilteredSweets(filtered);
  };

  const handleDelete = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`http://localhost:3000/api/sweets/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete sweet');
      }

      // Find the sweet to get its name for the toast message before updating the state
      const sweetToDelete = sweets.find(s => s.id === id);
      const sweetName = sweetToDelete?.name;

      // Update both sweets and filteredSweets states
      setSweets(prevSweets => prevSweets.filter(sweet => sweet.id !== id));
      setFilteredSweets(prevFilteredSweets => prevFilteredSweets.filter(sweet => sweet.id !== id));
      
      toast({
        title: "Success",
        description: `${sweetName || 'The sweet'} has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the sweet.",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRestock = async (id: string, restockQuantity: number) => {
    if (restockQuantity <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(`http://localhost:3000/api/sweets/${id}/restock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: restockQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to restock');
      }

      const updatedSweet = await response.json();
      const sweetName = updatedSweet.name;

      // Update local state with the response from server
      setSweets(prevSweets => {
        const updatedSweets = prevSweets.map(sweet =>
          sweet.id === id ? updatedSweet : sweet
        );
        setFilteredSweets(updatedSweets);
        return updatedSweets;
      });
      
      toast({
        title: "Success",
        description: `${sweetName} has been restocked with ${restockQuantity} items.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restock the sweet.",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleAddSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSweet.name || !newSweet.category || !newSweet.price || !newSweet.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/sweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newSweet.name,
          category: newSweet.category,
          description: newSweet.description || "",
          price: Number(newSweet.price),
          quantity: Number(newSweet.quantity),
          image_url: newSweet.image_url || null
        }),
      });

      if (!response.ok) throw new Error('Failed to add sweet');

      const addedSweet = await response.json();
      setSweets(prev => [...prev, addedSweet]);
      setFilteredSweets(prev => [...prev, addedSweet]);
      
      // Reset form
      setNewSweet({
        name: "",
        category: "candy",
        description: "",
        price: "",
        quantity: "",
        image_url: ""
      });
      setIsAddDialogOpen(false);

      toast({
        title: "Success",
        description: "New sweet added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add sweet",
        variant: "destructive",
      });
    }
  };

  const handlePurchase = async (sweetId: string) => {
    setProcessingId(sweetId);
    try {
      // First check if the sweet exists and has stock
      const sweet = sweets.find(s => s.id === sweetId);
      if (!sweet) {
        throw new Error('Sweet not found');
      }
      if (sweet.quantity <= 0) {
        throw new Error('Sweet is out of stock');
      }

      const response = await fetch(`http://localhost:3000/api/sweets/${sweetId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to purchase');
      }

      const updatedSweet = await response.json();

      // Update both sweets arrays with the new stock quantity
      setSweets(prevSweets => 
        prevSweets.map(sweet => sweet.id === sweetId ? updatedSweet : sweet)
      );
      setFilteredSweets(prevSweets => 
        prevSweets.map(sweet => sweet.id === sweetId ? updatedSweet : sweet)
      );

      toast({
        title: "Purchase successful! 🎉",
        description: `${updatedSweet.name} purchased successfully!`,
      });
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: error instanceof Error ? error.message : "Failed to purchase the sweet",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navbar isAdmin={isUserAdmin} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar isAdmin={isUserAdmin} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-candy bg-clip-text text-transparent">
            Indian Sweets Paradise
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and enjoy authentic Indian sweets
          </p>
        </div>

        {/* Loyalty Points */}
        <LoyaltyDisplay points={loyaltyPoints.points} lifetimePoints={loyaltyPoints.lifetime_points} />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="milk_sweet">Milk Sweet</SelectItem>
              <SelectItem value="bengali">Bengali Sweet</SelectItem>
              <SelectItem value="candy">Candy</SelectItem>
              <SelectItem value="halwa">Halwa</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under ₹50</SelectItem>
              <SelectItem value="medium">₹50 - ₹100</SelectItem>
              <SelectItem value="high">Over ₹100</SelectItem>
            </SelectContent>
          </Select>

          {isUserAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Add Sweet
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Sweet</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSweet} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={newSweet.name}
                      onChange={(e) => setNewSweet(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Sweet name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newSweet.category}
                      onValueChange={(value) => setNewSweet(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candy">Candy</SelectItem>
                        <SelectItem value="chocolate">Chocolate</SelectItem>
                        <SelectItem value="milk_sweet">Milk Sweet</SelectItem>
                        <SelectItem value="bengali">Bengali Sweet</SelectItem>
                        <SelectItem value="halwa">Halwa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newSweet.price}
                      onChange={(e) => setNewSweet(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newSweet.quantity}
                      onChange={(e) => setNewSweet(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newSweet.description}
                      onChange={(e) => setNewSweet(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Sweet description"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={newSweet.image_url}
                      onChange={(e) => setNewSweet(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="Image URL"
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Sweet</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                id={sweet.id}
                name={sweet.name}
                category={sweet.category}
                description={sweet.description || undefined}
                price={sweet.price}
                quantity={sweet.quantity}
                imageUrl={sweet.image_url || undefined}
                onPurchase={handlePurchase}
                onDelete={handleDelete}
                onRestock={handleRestock}
                isProcessing={processingId === sweet.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No sweets found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
