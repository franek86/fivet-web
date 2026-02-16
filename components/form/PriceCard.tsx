import { PriceCardProps } from "@/types/priceCard";
import Link from "next/link";

const PriceCard = ({
  title,
  subtitle,
  price,
  billingPeriod = "monthly",
  features,
  buttonLabel,
  highlight = false,
  note,
  link,
}: PriceCardProps) => {
  return (
    <article className={`relative bg-white rounded-2xl p-8 shadow-2xl flex flex-col ${highlight ? "scale-105 shadow-3xl" : "shadow-xl"}`}>
      {highlight && (
        <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
          <div className='px-3 py-1 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold'>
            Most Popular
          </div>
        </div>
      )}

      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>
          {subtitle && <p className='mt-1 text-sm text-slate-600'>{subtitle}</p>}
        </div>
        <div className='text-right'>
          <div className='text-4xl font-extrabold text-slate-800'>{price}</div>
          <div className='text-sm text-slate-500'>/ {billingPeriod}</div>
        </div>
      </div>

      <ul className='mt-6 space-y-3 text-slate-700 flex-1'>
        {features.map((item, index) => (
          <li key={index} className='flex items-start gap-3'>
            <svg className='w-5 h-5 text-green-600 shrink-0' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-sm'>{item}</span>
          </li>
        ))}
      </ul>
      {link && (
        <Link href={`${process.env.NEXT_PUBLIC_ADMIN_URL}${link}`}>
          <button className={`btn ${highlight ? "btn-lg" : "btn-sm"} btn-gradient mt-6`}>{buttonLabel}</button>
        </Link>
      )}
      {note && <div className='mt-4 text-sm text-slate-500'>{note}</div>}
    </article>
  );
};

export default PriceCard;
