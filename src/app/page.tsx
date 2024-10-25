import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/laptop.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

const clients = [
  ['Phobia', logoPhobiaLight],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We partner with businesses to deliver innovative web solutions
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Crafting digital experiences that drive business growth"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          At Spectrum Web Co, we specialize in creating innovative web design and development solutions that are uniquely tailored to your business needs. Our team collaborates closely with you to understand your goals, ensuring we deliver digital experiences that not only look exceptional but also engage your audience and drive meaningful results for your business growth. We are committed to helping you harness the power of the web to expand your reach and achieve your objectives.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Delivering purpose-driven web solutions for your business"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We combine creativity and cutting-edge technology to deliver bespoke web solutions that align with your business objectives. Our comprehensive range of services ensures that we can address all aspects of your online presence, from stunning web design to robust development practices. By leveraging the latest technologies, we help your business stand out in the digital landscape, engage your audience effectively, and drive tangible results.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
          <ListItem title="Custom Web Development">
  We specialize in developing high-end web applications that are custom-tailored to your business needs. Leveraging cutting-edge technologies such as React, Vue.js, Next.js, Nuxt.js, Svelte, Astro, and more, we build scalable, efficient, and user-friendly applications. Our solutions are designed to enhance your business operations, streamline processes, and provide your users with exceptional experiences that keep them coming back.
</ListItem>
            <ListItem title="Innovative Web Design">
              Our creative team delivers purpose-driven web design solutions that ensure your website stands out in a crowded digital marketplace. We focus on crafting visually stunning designs that effectively communicate your brand&apos;s message, resonate with your target audience, and drive engagement. From concept to completion, we work closely with you to bring your vision to life.
            </ListItem>
            <ListItem title="E-commerce Solutions">
              We build engaging and robust e-commerce platforms using Shopify and other leading technologies. Our e-commerce solutions are designed to provide seamless online shopping experiences for your customers, with intuitive navigation, secure transactions, and responsive designs. We help you increase sales, improve customer satisfaction, and grow your business in the competitive online retail space.
            </ListItem>
            <ListItem title="Content Management Systems">
              Our expertise in WordPress and other CMS platforms empowers you to manage and update your website content with ease. We develop custom CMS solutions that are intuitive, flexible, and tailored to your specific requirements. This gives you full control over your online presence, allowing you to keep your content fresh and relevant without the need for technical expertise.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    "We are a high-end boutique agency providing creative and innovative web design and development services Australia.",
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            High-end boutique web design and development agency in Sydney, Australia
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            At Spectrum Web Co, we are dedicated to providing creative and innovative, purpose-driven web design and development services. Based in Sydney, Australia, we specialize in crafting bespoke digital solutions for small to medium businesses. Our mission is to help you establish a strong online presence, engage your audience effectively, and achieve your business objectives through high-quality web experiences.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        Working with Spectrum Web Co was a transformative experience for our company. They exceeded our expectations with their innovative design and development services, delivering a website that truly represents our brand and resonates with our target audience. Their team&apos;s professionalism, creativity, and commitment to excellence made the entire process seamless and enjoyable. We highly recommend them to any business seeking top-tier web solutions.
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
