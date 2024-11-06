import NewVisitor from '@/components/reception/NewVistor';
import { ReceptionList } from '@/components/reception/ReceptionList';
import ReceptionProgress from '@/components/ReceptionProgress';

export default function Reception() {
  return (
    <>
      <div className="flex items-center gap-4">
        <ReceptionProgress />
        <NewVisitor />
      </div>
      <ReceptionList />
    </>
  );
}
