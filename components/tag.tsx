'use client';

import { Chip } from "@nextui-org/chip";
import React from "react";

function Tag({ name, color }: { name: string; color: string }) {
    return (
        <Chip style={{ backgroundColor: color }}>
            {name}
        </Chip>
    );
}

function ApplicationTag() {
    return <Tag name="Application" color="#FFAA60" />
}

export { ApplicationTag };
