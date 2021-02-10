import { CardComponent } from './card.component';

export default {
  title: 'Card'
};

export const Card = (args: { content: string }) => ({
  moduleMetadata: {
    declarations: [CardComponent]
  },
  component: CardComponent,
  props: {
    content: args.content
  },
  template: `<rob-card><div [innerHTML]="content"></div></rob-card>`
});

Card.args = {
  content: `<p>Card Component</p>`
};
