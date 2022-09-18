import * as React from "react";
import { Title } from "../../Components";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <section>
      <Title>Welcome to Customer.io TakeHome Test!</Title>
      <span>Go to Customers link on the top to get started</span>
    </section>
  );
}
