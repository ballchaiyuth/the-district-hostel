import PageHeader from "@/components/layout/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
import { useTranslations } from "next-intl";

export default function StoryPage() {
  const t = useTranslations("StoryPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="min-h-screen bg-muted text-foreground flex flex-col transition-colors duration-300">
      <PageHeader title={t("title")} containerClass={containerClass} />
      <ComingSoon statusText={t("status")} description={t("description")} />
    </main>
  );
}
