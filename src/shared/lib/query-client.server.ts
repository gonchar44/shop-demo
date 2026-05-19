import { cache } from "react";
import { makeQueryClient } from "@/shared/lib/query-client";

export const getQueryClient = cache(makeQueryClient);
