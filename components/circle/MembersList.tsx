import Image from "next/image";

export default function MembersList() {

  const members = Array(5).fill({
    name: "Favour",
    handle: "@favvy",
    score: 1000,
  });

  return (
    <div className="space-y-6">

      {members.map((m, i) => (

        <div
          key={i}
          className="flex justify-between items-center pb-6 "
        >

          <div className="flex gap-4 items-center">

            <Image
              src="/avatar.svg"
              alt="avatar"
              width={56}
              height={56}
              className="rounded-full"
            />

            <div>
              <p className="font-normal text-lg">
                {m.name}
              </p>

              <p className="text-gray-400">
                {m.handle}
              </p>

            </div>

          </div>

          <div>

            <span className="text-gray-400">
              Starix score:
            </span>

            <span className="font-normal ml-1">
              {m.score}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}