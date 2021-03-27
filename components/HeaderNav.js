import React from 'react'
import Link from 'next/link'

const HeaderNav = ({ items, selected = null }) => {
  let subNav = null
  if (selected) {
    subNav = items.find((item) => { return item.title === selected })
  }

  return (
    <>
      <div className="flex justify-center bg-medium-blue">
        {items.map((el) => {
          return (
            <div
              key={`nav-item-${el.title.toLowerCase().replace(/[^a-z0-9]/, '-')}`}
            >
              <div className="px-4 py-2 text-white">
                <Link href={el.href}>
                  <a>{el.title}</a>
                </Link>
              </div>
              {/* <div className="hidden">
            {el.items.map((sub) => (
              <div
                key={`nav-subitem-${sub.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]/, "-")}`}
              >
                <Link href={sub.href}>
                  <a>{sub.title}</a>
                </Link>
              </div>
            ))}
          </div> */}
            </div>
          )
        })}
      </div>
      {subNav && (
        <div className="flex justify-center bg-medium-blue border-t border-solid border-dark-blue">
          {subNav.items.map((sub) => {
            return (
              <div
                className="px-4 py-2 text-white"
                key={`nav-subitem-${sub.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]/, '-')}`}
              >
                <Link href={sub.href}>
                  <a>{sub.title}</a>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default HeaderNav
