"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ClientSearchParams = ({ onParamsChange }: { onParamsChange: (params: any) => void }) => {


  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("technology"));
    console.log(searchParams.get("filter"));
    console.log(searchParams.get("HUB"));

    
    // Extract query params safely
    const technology = searchParams.get("technology");
    const filter = searchParams.get("filter");
    const hub = searchParams.get("HUB");

    // Set only if values have changed
    onParamsChange((prevParams:any) => {
      const newParams = { technology, filter, hub };

      // Avoid unnecessary updates to prevent infinite loops
      if (
        prevParams.technology !== newParams.technology ||
        prevParams.filter !== newParams.filter ||
        prevParams.hub !== newParams.hub
      ) {
        return newParams;
      }

      return prevParams; // No change, avoid re-rendering
    });
  }, [searchParams]); // ✅ Depend on `searchParams` only

  return null;


};

export default ClientSearchParams;
