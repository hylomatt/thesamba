import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import constants from '../utils/constants'

const Header = ({ data }) => {
  return (
    <div className="flex bg-dark-blue">
      <Link href={data.logo.href}>
        <a>
          <Image
            src={`${constants.baseUrl}${data.logo.src}`}
            alt=""
            width={320}
            height={60}
          />
        </a>
      </Link>
    </div>
  )
}

export default Header
