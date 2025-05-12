import ClientWorkshop from "./ClientWorkshop";

export async function generateStaticParams() {
  try {
    const res = await fetch("https://testing.topplaced.com/api/workshops");
    const workshops = await res.json();

    return workshops.map((workshop) => ({
      id: workshop.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function Page({ params }) {
  return <ClientWorkshop id={params.id} />;
}
