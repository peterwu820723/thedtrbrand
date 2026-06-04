import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Logo className="w-16 h-16 mx-auto mb-6" />
        <p className="eyebrow text-error mb-2">Error 404</p>
        <h1 className="heading-display text-5xl md:text-6xl mb-4">
          Lost the chain
        </h1>
        <p className="text-fg-secondary mb-8">
          The page you're looking for doesn't exist. Let's get you back to the drop.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
