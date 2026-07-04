import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegacyPilotCoursePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/pilot-course-training-in-india');
  }, [router]);

  return null;
}
