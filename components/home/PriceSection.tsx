"use client";
import { useTranslation } from "react-i18next";

import { PriceCard } from "../form";
import { PriceCardProps } from "@/types/priceCard";

const PriceSection = () => {
  const { t } = useTranslation();

  const standardCardData: PriceCardProps = {
    title: t("pricing.standard.title"),
    subtitle: t("pricing.standard.subtitle"),
    price: "$2.99",
    features: [t("pricing.standard.feature1"), t("pricing.standard.feature2"), t("pricing.standard.feature3")],
    buttonLabel: t("pricing.standard.buttonLabel"),
    note: t("pricing.standard.note"),
    link: "/sign-up?plan=STANDARD",
  };

  const premuimCardData: PriceCardProps = {
    title: t("pricing.premium.title"),
    subtitle: t("pricing.premium.subtitle"),
    price: "$14.99",
    features: [
      t("pricing.premium.feature1"),
      t("pricing.premium.feature2"),
      t("pricing.premium.feature3"),
      t("pricing.premium.feature4"),
      t("pricing.premium.feature5"),
    ],
    buttonLabel: t("pricing.premium.buttonLabel"),
    note: t("pricing.premium.note"),
    highlight: true,
    link: "/sign-up?plan=PREMIUM",
  };

  return (
    <div className='container mx-auto'>
      <section className='text-center p-16'>
        <h2 className='text-3xl sm:text-4xl font-semibold leading-relaxed'>{t("pricing.title")}</h2>
        <h3 className='text-lg mt-2 opacity-90'>{t("pricing.subtitle")}</h3>
      </section>

      {/* Cards Grid */}
      <section className='container grid gap-6 md:grid-cols-2 pt-16'>
        <PriceCard {...standardCardData} />
        <PriceCard {...premuimCardData} />
      </section>
    </div>
  );
};

export default PriceSection;
