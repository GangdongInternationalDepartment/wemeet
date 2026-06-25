import { getWeMeetProgram } from "@/lib/data";
import WeMeetProgramClient from "./client";

export const dynamic = "force-dynamic";

export default async function WeMeetProgramPage() {
  const program = await getWeMeetProgram();
  return <WeMeetProgramClient program={program} />;
}
