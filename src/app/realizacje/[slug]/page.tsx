import { notFound } from "next/navigation";
import { apartments } from "@/lib/realizacje";
import ApartmentPageClient from "./ApartmentPageClient";

export async function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

export default function ApartmentPage({
  params,
}: {
  params: { slug: string };
}) {
  const apartment = apartments.find((a) => a.slug === params.slug);
  if (!apartment) notFound();
  return <ApartmentPageClient apartment={apartment} />;
}
