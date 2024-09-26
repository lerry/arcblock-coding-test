import { Card, CardBody, CardHeader, Divider, Skeleton } from '@nextui-org/react';

export default function UserProfileSkeleton() {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950">
        <Skeleton className="h-20 w-20 translate-y-12 rounded-full" />
      </CardHeader>
      <CardBody>
        <div className="pb-4 pt-6">
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Divider />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
