import { createSignal } from "solid-js";
import { User } from "./types";

export const [user, setUser] = createSignal<User | null>(null);
