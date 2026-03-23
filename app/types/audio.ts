export interface Track {
  title: string
  file: string
}

export interface Album {
  title: string
  year: number
  type: string
  link?: string
  tracks: Track[]
}
