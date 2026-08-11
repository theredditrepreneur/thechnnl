import type { Metadata } from "next";
import { SearchClient } from "./search-client";
export const metadata: Metadata = { title: "Search", description: "Search The Chnnl stories." };
export default function SearchPage() { return <SearchClient />; }
