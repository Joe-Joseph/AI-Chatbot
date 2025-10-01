const TypingIndicator = () => {
   return (
      <div className="flex gap-1 rounded-xl self-start bg-gray-200 px-3 py-2">
         <Dot />
         <Dot className="[animation-delay:0.2s]" />
         <Dot className="[animation-delay:0.4s]" />
      </div>
   );
};

type DotProps = {
   className?: string;
};

const Dot = ({ className }: DotProps) => (
   <div
      className={`bg-gray-800 w-2 h-2 rounded-full animate-pulse ${className}`}
   ></div>
);

export default TypingIndicator;
