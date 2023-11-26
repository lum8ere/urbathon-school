import { NewsAndAnnouncementsEditing } from 'components/ui/NewsAndAnnouncements/NewsAndAnnouncementsEditing';
import { news } from 'mockData';
import { memo } from 'react';

export const NewsPage = memo(() => {
    return <NewsAndAnnouncementsEditing data={news} />;
});
