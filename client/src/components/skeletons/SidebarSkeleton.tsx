import { Users } from "lucide-react";

const SidebarSkeleton = () => {
    // Create 8 skeleton items
    const skeletonContacts = Array(7).fill(null);

    return (
        <aside
            className="h-screen w-full border-r-2 border-[#0a0a0a] 
        flex flex-col transition-all duration-200"
        >
            {/* Header */}
            <div className="border-b-2 border-[#0a0a0a] w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span>Contacts</span>
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* Avatar skeleton */}
                        <div className="relative">
                            <div className="skeleton bg-[#080808] size-12 " />
                        </div>

                        {/* User info skeleton - only visible on larger screens */}
                        <div className="flex flex-col">
                            <div className="skeleton bg-[#080808] h-4 w-32 mb-2" />
                            <div className="skeleton bg-[#080808] h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;