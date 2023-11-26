import { NewsAndAnnouncements } from 'components/ui/NewsAndAnnouncements/NewsAndAnnouncements';
import { news } from 'mockData';

export const HomePage = () => {
    return <NewsAndAnnouncements data={news} />;
};
