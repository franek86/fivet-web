"use client";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className='h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-linear-to-b from-[#f7f9ff] via-[#fffbee] to-[#f7f9ff]'>
      <div className='md:max-w-3xl mx-auto text-center mb-10'>
        <h1 className='text-center text-2xl md:text-6xl md:leading-20 font-semibold md:max-w-4xl text-slate-900'>
          {t("home.hero.heading_streamline")}{" "}
          <span className='relative bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text text-nowrap'>
            {t("home.hero.heading_vessel")}{" "}
          </span>
          {t("home.hero.heading_procurement")}.
        </h1>
        <p className='text-center text-base text-slate-700 max-w-lg mx-auto mt-2'>{t("home.hero.subheading")}.</p>
      </div>
      <SearchBar />
    </section>
  );
};

export default HeroSection;
