import type { Metadata } from "next";
import { SearchClient } from "./search-client";
import {getAllContentArticles} from "../../lib/content";
export const metadata: Metadata = { title: "Search", description: "Search The Chnnl stories." };
export default async function SearchPage() { return <SearchClient articles={await getAllContentArticles()} />; }
