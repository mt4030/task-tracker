import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function User(){



    return(
        <HoverCard>
  <HoverCardTrigger> <div className="flex items-center gap-2 px-5 rounded cursor-pointer 
                  bg-[#0066FF] hover:bg-[#3385FF]
                  w-10 sm:w-auto justify-center py-1">
    
    {/* Text hidden on mobile, visible from sm+ */}
    <span className="hidden sm:block text-sm">
      Guest
    </span>

    {/* Avatar always visible */}
    <div className="w-8 h-8 rounded-full sm:bg-white/30 
                    flex items-center justify-center 
                    text-xs font-medium">
      G
    </div>
  </div></HoverCardTrigger>
  <HoverCardContent>
   nothing here - yet
  </HoverCardContent>
</HoverCard>




 
    )
}