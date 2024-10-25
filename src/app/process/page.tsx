import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We collaborate intimately with our clients to gain a profound understanding of their{' '}
          <strong className="font-semibold text-neutral-950">requirements</strong> and
          objectives, immersing ourselves in their daily operations to grasp the core dynamics of
          their business.
        </p>
        <p>
          Our dedicated team of professional analysts conducts thorough shadowing
          of company directors over several weeks, while our account managers
          diligently perform detailed audits of company documents. Our leading
          security experts employ advanced social engineering techniques to
          securely access and assess their{' '}
          <strong className="font-semibold text-neutral-950">
            business
          </strong>{' '}
          accounts, subsequently collaborating with our forensic accounting
          team for a comprehensive evaluation.
        </p>
        <p>
          Following the completion of our exhaustive audit, we furnish a detailed, strategic{' '}
          <strong className="font-semibold text-neutral-950">proposal</strong> that includes critical insights,
          coupled with an expertly crafted budget plan.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Blood samples</TagListItem>
        <TagListItem>Employee surveys</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
        <TagListItem>Forensic audit</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Utilizing insights gained from the discovery phase, we craft a clear
          and strategic roadmap for each product, setting a course towards
          successful delivery. This roadmap is meticulously designed to align
          with industry standards and expedite the project timeline, ensuring
          efficient and effective outcomes.
        </p>
        <p>
          Each client is partnered with a dedicated key account manager, ensuring seamless communication and transparency throughout the project lifecycle. These managers serve as invaluable liaisons, addressing client inquiries and enabling the development team to focus on crafting innovative solutions and leveraging cutting-edge open-source technologies.
        </p>
        <p>
          Our account managers ensure timely responses to client emails, with all communications conducted in a professional and courteous manner. This approach maintains a high standard of service and fosters a positive and collaborative relationship with our clients.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }}
        className="mt-12"
      >
        Spectrum Web Co were so regular with their progress updates we almost began to
        think they were automated!
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          During the midpoint of the Build phase, we strategically adjust the project timeline by extending it 6 weeks due to evolving <strong className="font-semibold text-neutral-950">requirements</strong>. This adjustment allows us to optimize the budget effectively before project completion.
        </p>
        <p>
          While leveraging a set of pre-designed components, a significant portion of the project <strong className="font-semibold text-neutral-950">development</strong> occurs in the final stages. Much of the allocated development period is devoted to creating captivating augmented reality demonstrations that garner widespread attention on social media platforms.
        </p>
        <p>
          We ensure that the core pages of the website are <strong className="font-semibold text-neutral-950">fully operational</strong> at launch. The peripheral pages will begin as placeholder content, and will be updated as part of our premium <strong className="font-semibold text-neutral-950">maintenance</strong> service agreement.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Elements Included in this Phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our development ensures comprehensive test coverage to maintain quality assurance, although there is room for enhancement in test effectiveness.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability, we deploy top-tier Digital Ocean infrastructure suitable for robust services.
        </ListItem>
        <ListItem title="Support">
          By managing the API keys for all crucial business services, we offer ongoing support and partnership, ensuring a seamless operational experience.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our values"
        title="Balancing reliability and innovation"
      >
        <p>
          We are committed to embracing new trends and technologies in the industry.
          Our team consistently evaluates and integrates innovative solutions
          to ensure we are leveraging the best tools available. Our core values guide
          us in making strategic decisions that benefit our clients.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
            In every collaboration, our first step is to seamlessly integrate your brand identity into our existing frameworks, ensuring your logo is elegantly incorporated. Subsequently, we meticulously tailor the color scheme to align with your brand essence, creating a cohesive and bespoke aesthetic.
          </GridListItem>
          <GridListItem title="Efficient">
            We pride ourselves on our exceptional ability to consistently meet project deadlines, a testament to our strategic foresight and meticulous planning.
          </GridListItem>
          <GridListItem title="Adaptable">
            In the dynamic landscape of modern business, each organization faces its own set of challenges. Our commitment is to skillfully tailor our pre-existing solutions to meet the unique demands of our clients, ensuring a perfect fit for their specific needs.
          </GridListItem>
          <GridListItem title="Honest">
            We pride ourselves on maintaining transparency throughout all our processes, ensuring our clients are informed and engaged at every step.
          </GridListItem>
          <GridListItem title="Loyal">
            We cultivate enduring partnerships that extend beyond mere project delivery, enabling sustained collaboration and mutual growth for years to come.
          </GridListItem>
          <GridListItem title="Innovative">
            In an ever-evolving technological landscape, our commitment is to stay at the forefront of innovation. We actively seek and integrate cutting-edge open-source projects to enhance our capabilities.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Our process" title="How we work">
        <p>
          Our commitment lies in optimizing efficiency and effectively utilizing our resources to deliver exceptional value to our clients. We achieve this by crafting bespoke projects for each client, ensuring innovative and tailored solutions that are aligned with their unique needs and aspirations.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
