import NewVisitor from "@/components/reception/NewVistor";
import { ReceptionList } from "@/components/reception/ReceptionList";
import ReceptionProgress from "@/components/ReceptionProgress";



export default function Reception() {
    return (
      <>
        <ReceptionProgress />
        <NewVisitor />
        <ReceptionList />
      </>
    );
};