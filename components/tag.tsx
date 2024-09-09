'use client';

import { Chip } from "@nextui-org/chip";
import React from "react";
import { Tag } from "@/config/publications"


function ApplicationTag({ tag } : { tag: Tag }) {
    let name
    let color
    console.log(tag)
    switch (tag) {
        case Tag.Application:
            name = "Application"
            color = "#ffe119"
            break
        case Tag.TrustworthyAI:
            name = "Trustworthy AI"
            color = "#3cb444b"
            break
    }
    return <><Chip style={{ backgroundColor: color }}>
            {name}
            </Chip></>
}

export { ApplicationTag };
