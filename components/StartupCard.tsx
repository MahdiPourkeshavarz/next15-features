import { StartupCardType } from "@/types";
import { formatDate } from "@/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
function StartupCard({ post }: { post: StartupCardType }): JSX.Element {
  return (
    <>
      <li className="startup-card group">
        <div className="flex-between">
          <p className="startup_card_date">{formatDate(post._createdAt)}</p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-primary" />
            <span className="text-16-medium">{post.views}</span>
          </div>
        </div>
        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${post.author._id}`}>
              <p className="text-16-medium line-clamp-1">{post.author.name}</p>
            </Link>
            <Link
              className="text-26-semibold line-clamp-1"
              href={`/startup/${post._id}`}
            >
              <h3>{post.title}</h3>
            </Link>
          </div>
          <Link href={`/user/${post.author._id}`}>
            <Image
              src={post.image}
              alt="/"
              height={48}
              width={48}
              className="rounded-full"
            />
          </Link>
        </div>
        <Link href={`/startup/${post._id}`}>
          <p className="startup-card_desc">{post.description}</p>
          <Image
            src={post.image}
            alt="/"
            height={250}
            width={400}
            className="rounded-2xl startup-card_img"
          />
        </Link>
        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${post.category.toLocaleLowerCase()}`}>
            <p className="text-16-medium">{post.category}</p>
          </Link>
          <Button className="startup-card_btn">
            <Link href={`/startup/${post._id}`}>Details</Link>
          </Button>
        </div>
      </li>
    </>
  );
}

export default StartupCard;
