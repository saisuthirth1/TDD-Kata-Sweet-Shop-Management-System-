import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface LoyaltyDisplayProps {
  points: number;
  lifetimePoints: number;
}

export const LoyaltyDisplay = ({ points, lifetimePoints }: LoyaltyDisplayProps) => {
  return (
    <Card className="glass border-accent/50 shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Loyalty Points</p>
            <motion.div
              key={points}
              initial={{ scale: 1.5, color: "hsl(var(--accent))" }}
              animate={{ scale: 1, color: "hsl(var(--foreground))" }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold flex items-center gap-2"
            >
              <Trophy className="h-8 w-8 text-accent" />
              {points}
            </motion.div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Lifetime
            </p>
            <p className="text-2xl font-semibold text-muted-foreground">
              {lifetimePoints}
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            Earn 1 point for every ₹10 spent! 🎉
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
