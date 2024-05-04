import {
  CopyIcon,
  CrumpledPaperIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import path from "path";

import { Post, PostMatter } from "./posts";

import NewspaperBackground from "@/assets/img/jas-min.webp";
import Link from "@/components/custom/link-wrapper";
import VTStyleLogo from "@/components/custom/vt-style-logo";
import DefaultLayout from "@/components/layout/default";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { POSTS_PATH, postFilePaths } from "@/content/const";

export default function Home({ posts }: { posts: PostMatter[] }) {
  const lastTwoPosts = posts
    .sort((a, b) => {
      return (
        new Date(b.data.updatedAt).getTime() -
        new Date(a.data.updatedAt).getTime()
      );
    })
    .slice(0, 2)
    .map((a) => a.data);

  return (
    <DefaultLayout title="Landing Page">
      <div className="w-full min-h-screen flex flex-col pb-24">
        <section className="w-full dark:bg-[#161514] bg-[fdfdfd] relative border-b border-border">
          <Image
            src={NewspaperBackground}
            alt="Hero BG"
            width={1080}
            height={500}
            blurDataURL={NewspaperBackground.blurDataURL}
            placeholder="blur"
            fetchPriority="high"
            className="absolute w-full object-cover max-h-full opacity-5 grayscale inset-0 z-0"
          />
          <section className="w-full z-[1] max-w-3xl relative p-5 mx-auto">
            <VTStyleLogo className="lg:w-3/4 mx-auto w-full" />
          </section>
        </section>
        <section className="w-full max-w-3xl flex flex-col gap-5 relative p-5 mx-auto">
          <div className="py-3 w-fulls rounded-lg border border-border bg-card">
            <p className="mb-3 px-5 italic">
              And those who were seen dancing were thought to be insane by those
              who could not hear the music.
            </p>
            <Separator />
            <p className="text-right font-light px-5 pt-3 text-sm dark:text-muted-foreground">
              Friedrich Nietzsche
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-3 my-1 items-center">
              <InfoCircledIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold dark:font-medium">
                Brief Description
              </h2>
            </div>
            <p>
              A 21 y&apos;o living in Indonesia. An undergrad student majoring
              in Computer Science at Sriwijaya University. High interest in web
              development and current AI trends. Likes to learn new things and
              experiment. Loves watching anime and playing games. Also does
              music and stuffs.
            </p>
            <Separator />
            <div className="flex gap-3 my-1 items-center">
              <CrumpledPaperIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold dark:font-medium">
                Most Recent Posts
              </h2>
            </div>
            <p>
              Here are 2 most recent posts from the blog. You can read them by
              clicking the subsequent cards below:
            </p>
            {lastTwoPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{
                  width: "100%",
                }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between flex-row-reverse flex-wrap gap-5">
                    <div className="flex flex-row gap-3">
                      {post.tags &&
                        post.tags.map((tag) => (
                          <Badge variant={"secondary"} key={tag}>
                            {tag}
                          </Badge>
                        ))}
                    </div>
                    <div className="flex flex-row gap-3">
                      <Badge>{post.updatedAt}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <p>
              You can also view all of the posts{" "}
              <Link
                href="/posts"
                className="text-primary hover:underline transition-all"
              >
                here
              </Link>
              .
            </p>
            <Separator />
            <div className="flex gap-3 my-1 items-center">
              <CopyIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold dark:font-medium">
                Acknowledgements
              </h2>
            </div>
            <p>
              The newspaper background image I used in the hero section is made
              by{" "}
              <a
                href="https://unsplash.com/@filmbetrachterin"
                className="text-primary hover:underline transition-all"
              >
                Jas Min
              </a>{" "}
              from Unsplash. You can view the original image{" "}
              <a
                href="https://unsplash.com/photos/a-piece-of-paper-with-words-written-on-it-hYaAxItJGoM"
                className="text-primary hover:underline transition-all"
              >
                <span className="sr-only">Jas Min original image</span>
                here
              </a>
              .
            </p>
            <Separator />
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data: {
        slug: filePath.replace(/\.mdx?$/, ""),
        ...data,
      } as Post,
      filePath,
    };
  });

  return { props: { posts } };
}
