
import moment from 'moment';
import { useRouter } from 'next/navigation';


export default function MyNotificationCard({ data }: { data: any }) {
    const router = useRouter();
    return <div onClick={(e) => {
        //  router.push(`/course/${data.Course.courseId}`)
    }} className="cursor-pointer box-border flex flex-row pb-1 justify-start items-center border-text_grey border-b gap-12">

        <p className="text-text_grey text-[12px] font-light">{moment(data.createdDate).fromNow()}</p>
        <h2 className="flex-1 text-white text-xl font-light text-start">{data.title}</h2>
    </div>;
}