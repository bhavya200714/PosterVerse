import { Link } from "wouter";
import { SiInstagram, SiX, SiPinterest } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="font-serif text-xl font-bold">PosterVerse</span>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Premium aesthetic posters curated for modern spaces. Transform your walls with art that speaks to your soul.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-muted-foreground transition-colors" aria-label="Instagram" data-testid="link-instagram">
                <SiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors" aria-label="X" data-testid="link-twitter">
                <SiX className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors" aria-label="Pinterest" data-testid="link-pinterest">
                <SiPinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop?category=minimal" className="text-sm text-muted-foreground">Minimal</Link>
              <Link href="/shop?category=anime" className="text-sm text-muted-foreground">Anime</Link>
              <Link href="/shop?category=nature" className="text-sm text-muted-foreground">Nature</Link>
              <Link href="/shop?category=quotes" className="text-sm text-muted-foreground">Quotes</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground">About Us</Link>
              <Link href="/contact" className="text-sm text-muted-foreground">Contact</Link>
              <Link href="/shop" className="text-sm text-muted-foreground">All Posters</Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} PosterVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
