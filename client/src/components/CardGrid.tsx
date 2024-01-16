import { Card, Typography } from '@mui/material';
import { CardData } from '../types';

type Props = {
  data: CardData[];
};
const CardGrid: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return;
  }
  return (
    <>
      {data.map(({ id, title, body }) => (
        <Card
          key={`card_key_${id}`}
          className="overflow-y-scroll p-2 col-span-1 grid grid-rows-2 grid-cols-1"
        >
          <Typography
            variant="h6"
            className="font-medium underline underline-offset-2 row-span-1 text-center"
          >
            {title}
          </Typography>
          <section className="h-[8rem] overflow-y-auto no-scrollbar">
            <Typography variant="body2" className="self-baseline">
              {body}
            </Typography>
          </section>
        </Card>
      ))}
    </>
  );
};

export default CardGrid;
