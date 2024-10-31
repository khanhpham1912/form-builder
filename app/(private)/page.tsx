import { getFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateForm } from "@/modules/form";

export default function Home() {
  return (
    <div className="p-4 flex flex-grow flex-col gap-6">
      <CardStatusWrapper />
      <Separator />
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between">
          <span className="font-bold text-2xl">Your forms</span>
          <CreateForm />
        </div>
      </div>
    </div>
  );
}

async function CardStatusWrapper() {
  const stats = await getFormStats();
  return <StatsCards loading={!stats} data={stats} />;
}

interface StatsCardProps {
  data: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return (
    <div className="w-full h-fit gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title={"Total visits"}
        value={data.visits.toLocaleString()}
        loading={loading}
        className="shadow-sm shadow-blue-600"
      />
      <StatsCard
        title={"Total submissions"}
        value={data.submissions.toLocaleString()}
        loading={loading}
        className="shadow-sm shadow-red-600"
      />
      <StatsCard
        title={"Submission rate"}
        value={data.submissionRate.toLocaleString()}
        loading={loading}
        className="shadow-sm shadow-purple-600"
      />
      <StatsCard
        title={"Bounce rate"}
        value={data.bounceRate.toLocaleString()}
        loading={loading}
        className="shadow-sm shadow-yellow-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  loading,
  className,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  loading: boolean;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span>0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
      </CardContent>
    </Card>
  );
}
