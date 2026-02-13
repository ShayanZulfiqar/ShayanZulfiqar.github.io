"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { injectStore } from "@/services/ApiService";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Inject store into ApiService to break circular dependency
  injectStore(store);

  return <Provider store={store}>{children}</Provider>;
}
