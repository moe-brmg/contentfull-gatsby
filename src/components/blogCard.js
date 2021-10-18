import React from "react"
import { Card, Icon } from "semantic-ui-react"

export default function BlogCard({ image, header, meta, description }) {
  return (
    <Card image={image} header={header} meta={meta} description={description} />
  )
}
