import { Film } from "lucide-react";
import { Link } from "@remix-run/react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui";

export const GlobalHeader = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* ロゴ部分 */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 mr-8">
          <Film className="h-6 w-6" />
          <span className="font-bold text-xl">Sakila</span>
        </Link>
        {/* ナビゲーションメニュー */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/films" className={navigationMenuTriggerStyle()}>
                映画
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/actors" className={navigationMenuTriggerStyle()}>
                俳優
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/customers" className={navigationMenuTriggerStyle()}>
                顧客
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/rentals" className={navigationMenuTriggerStyle()}>
                レンタル
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/inventory" className={navigationMenuTriggerStyle()}>
                在庫
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/payments" className={navigationMenuTriggerStyle()}>
                支払い
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/staff" className={navigationMenuTriggerStyle()}>
                スタッフ
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/stores" className={navigationMenuTriggerStyle()}>
                店舗
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
