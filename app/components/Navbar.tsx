import { Link, NavLink } from "react-router";
import { Badge, Button, Tooltip } from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  MoonOutlined,
  RocketOutlined,
  SunOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useTheme } from "../ThemeContext";
import { useFavorites } from "../FavoritesContext";

const navItems = [
  { to: "/", label: "Home", icon: <HomeOutlined />, end: true },
  { to: "/characters", label: "Personaggi", icon: <UserOutlined /> },
  { to: "/episodes", label: "Episodi", icon: <VideoCameraOutlined /> },
  { to: "/locations", label: "Locations", icon: <EnvironmentOutlined /> },
  { to: "/favorites", label: "Preferiti", icon: <HeartOutlined /> },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const isDark = theme === "dark";

  const totalFavorites =
    favorites.characters.length +
    favorites.episodes.length +
    favorites.locations.length;

  return (
    <header className="sticky top-0 z-20 bg-(--navbar-bg) text-(--app-text) border-b border-(--navbar-border) backdrop-blur-[18px] px-8 py-3.5 flex justify-between items-center gap-4.5 flex-wrap shadow-[0_12px_32px_rgba(15,23,42,0.06)] max-[900px]:items-stretch max-[900px]:px-4.5">
      <Link
        to="/"
        className="text-(--app-text) no-underline inline-flex items-center gap-3 text-lg font-extrabold leading-tight max-[900px]:flex-auto"
      >
        <span className="w-10.5 h-10.5 rounded-xl bg-(--logo-mark-bg) text-white inline-flex items-center justify-center text-[22px] shadow-[0_10px_18px_rgba(22,163,74,0.22)]">
          <RocketOutlined />
        </span>
        <span>
          Rick & Morty
          <small className="text-(--app-muted) block text-xs font-semibold mt-0.5">
            Explorer
          </small>
        </span>
      </Link>

      <nav className="flex gap-1.5 flex-wrap items-center justify-center flex-1 max-[900px]:order-3 max-[900px]:flex-[1_0_100%] max-[900px]:justify-start max-[900px]:overflow-x-auto max-[900px]:pb-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                "text-(--navbar-link) no-underline text-sm font-[650] flex items-center gap-1.75 min-h-9.5 px-3 rounded-full",
                "transition-all duration-160 hover:text-(--navbar-link-hover) hover:bg-(--navbar-link-active-bg) hover:-translate-y-px",
                "max-[900px]:flex-none max-[560px]:min-h-9 max-[560px]:px-2.5",
                isActive ? "text-(--navbar-link-active) bg-(--navbar-link-active-bg)" : "",
              ].join(" ")
            }
          >
            {item.to === "/favorites" ? (
              <Badge count={totalFavorites} size="small" color="#22c55e" offset={[4, -2]}>
                {item.icon}
              </Badge>
            ) : (
              item.icon
            )}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="inline-flex items-center gap-2.5 max-[900px]:flex-auto max-[900px]:justify-end">
        <Tooltip title={isDark ? "Tema chiaro" : "Tema scuro"}>
          <Button
            shape="circle"
            style={{ borderColor: "var(--navbar-border)" }}
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            aria-label={isDark ? "Tema chiaro" : "Tema scuro"}
          />
        </Tooltip>
      </div>
    </header>
  );
}
