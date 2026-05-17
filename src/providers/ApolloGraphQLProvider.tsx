"use client";

import { client } from "@/src/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";

interface ApolloGraphQLProviderProps {
  children: React.ReactNode;
}

export function ApolloGraphQLProvider({
  children,
}: ApolloGraphQLProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
