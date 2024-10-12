import { createEffect, createMemo, For, Match, Show, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import client from "../../../../tina/__generated__/client";
import type { HomeQuery, Home } from "../../../../tina/__generated__/types";
import { createTina, tinaField } from "../../../../tina/tina-helpers";
import { Link } from "../../shared/link/link";

export default (props: {
  data: Awaited<ReturnType<typeof client.queries.home>>;
}) => {
  const initialData = createTina<HomeQuery>(props.data).data;
  const data = createMemo(() => initialData()?.home);
  createEffect(() => console.log(data()));
  return (
    <section class="h-viewi lg:flex-row-reverse lg:gap-8 flex gap-4 flex-col items-center justify-center">
      {/* <Image
        src={mainImage}
        width={300}
        alt=''
      /> */}
      <div
        class="text-center flex flex-col gap-2"
        data-tina-field={tinaField(data(), "text")}>
        <T qwer={data()?.text} />
      </div>
      <ul class="flex gap-2" data-tina-field={tinaField(data(), "buttons")}>
        <For each={data()?.buttons}>
          {(btn, i) => (
            <li>
              <Link appearance={!i() ? "primary" : "default"}>
                {btn?.label}
              </Link>
            </li>
          )}
        </For>
      </ul>
      {/* <div class="flex gap-4 flex-col items-center justify-center lg:max-w-[500px]">
        <h1 class="text-center">
          The <span class="em">Perfect</span> Cup of Coffee.
        </h1>
        <p class="text-center">
          A coffee van based on Freo’s South Beach dog beach
        </p>
        <div class="flex gap-2">
          <Link class="" appearance="primary" href="/menu">
            See our menu
          </Link>
          <Link class="" href="/contact">
            Find Us
          </Link>
        </div>
      </div> */}
    </section>
  );
};

const T = (props: { qwer: Home["text"] }) => {
  const A = createMemo(() => (
    <For each={props.qwer.children}>{(child) => <T qwer={child} />}</For>
  ));
  return (
    <Switch
      fallback={
        <Dynamic component={props.qwer?.type}>
          <A />
        </Dynamic>
      }>
      <Match when={props.qwer?.type === "root"}>
        <A />
      </Match>
      <Match when={props.qwer?.type === "text"}>
        <Show when={props.qwer?.bold} fallback={props.qwer.text}>
          <span class="em">{props.qwer.text}</span>
        </Show>
      </Match>
    </Switch>
  );
};
