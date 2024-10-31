import { getFormStats } from "@/actions/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Col, Row } from "@/components/ui/Grid";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({
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
}) => {
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
              <span />
            </Skeleton>
          ) : (
            value
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  data: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

export const StatCards = (props: StatCardsProps) => {
  const { data, loading } = props;
  return (
    <Row gutter={4}>
      <Col xs={12} md={6} lg={3}>
        <StatCard
          title={"Total visits"}
          value={data.visits.toLocaleString()}
          loading={loading}
          className="shadow-sm shadow-blue-600"
        />
      </Col>
      <Col xs={12} md={6} lg={3}>
        <StatCard
          title={"Total submissions"}
          value={data.submissions.toLocaleString()}
          loading={loading}
          className="shadow-sm shadow-red-600"
        />
      </Col>
      <Col xs={12} md={6} lg={3}>
        <StatCard
          title={"Submission rate"}
          value={data.submissionRate.toLocaleString()}
          loading={loading}
          className="shadow-sm shadow-purple-600"
        />
      </Col>
      <Col xs={12} md={6} lg={3}>
        <StatCard
          title={"Bounce rate"}
          value={data.bounceRate.toLocaleString()}
          loading={loading}
          className="shadow-sm shadow-yellow-600"
        />
      </Col>
    </Row>
  );
};
