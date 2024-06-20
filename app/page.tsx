// "use client";

import React from "react";
import Button from "./reUse/Button";
import { MdPeople } from "react-icons/md";
import Input from "./reUse/Input";
import { useSession } from "next-auth/react";
import cloudinary from "./utils/cloudinary";

const page = () => {
  // const session = await getServerSession(options);

  // const session = useSession();
  // console.log("reading session: ", session);

  const uploadImage = async (formData: FormData) => {
    "use server";

    const image = formData.get("image") as File;
    const file = await image.arrayBuffer();
    const buffer = new Uint8Array(file);

    const { secure_url }: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, data) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(data);
          }
        })
        .end(buffer);
    });
    console.log(secure_url);

    const URL: string =
      "https://your-store-iota.vercel.app/api/user/66742c2eed06c095686e6b7a";

    const view = await fetch(URL, {
      method: "PATCH",
      body: JSON.stringify({ avatar: secure_url }),
      headers: {
        "content-type": "application/json",
      },
    });

    const read = await view.json();

    console.log(read);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <form action={uploadImage}>
        <input type="file" name="image" />

        <button type="submit">Add Image</button>
      </form>
      <Button icon={<MdPeople />} className="bg-green-500">
        Click here
      </Button>

      <br />
      <br />
      <br />
      <br />

      <Button something="warning">Me</Button>

      <br />
      <br />
      <br />
      <br />

      <Button something="danger" size="xs" className="bg-red-300 ">
        Me
      </Button>

      <br />
      <br />
      <br />
      <br />

      <Input
        icon={<MdPeople />}
        title="Enter your Name"
        place="Name"
        className="border-red-500"
      />
    </div>
  );
};

export default page;
