import { getForms, getFormStats } from "@/actions/form";
import { For } from "@/components/ui/For";
import { Col, Row } from "@/components/ui/Grid";
import { Separator } from "@/components/ui/separator";
import { CreateForm, FormCard, StatCards } from "@/modules/form";
import { FormSchemaType } from "@/schemas/form";

async function CardStatusWrapper() {
  const stats = await getFormStats();
  return <StatCards loading={!stats} data={stats} />;
}

export default async function Home() {
  const forms = await getForms();
  return (
    <div className="p-4 flex flex-grow flex-col gap-6">
      <CardStatusWrapper />
      <Separator />
      <div className="flex flex-col flex-grow">
        <span className="font-bold text-2xl">Your forms</span>
        <Row className="mt-4" gutter={4}>
          <Col xs={12} md={6} lg={3}>
            <CreateForm />
          </Col>
          <For each={forms}>
            {(form, index) => (
              <Col key={index} xs={12} md={6} lg={3}>
                <FormCard form={form} />
              </Col>
            )}
          </For>
        </Row>
      </div>
    </div>
  );
}
