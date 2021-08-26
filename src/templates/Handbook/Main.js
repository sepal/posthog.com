import React, { useRef } from 'react'
import MainSidebar from './MainSidebar'
import InternalSidebar from './InternalSidebar'
import SectionLinks from './SectionLinks'
import SectionLink from './SectionLink'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { shortcodes } from '../../mdxGlobalComponents'

const A = (props) => <a {...props} className="text-yellow hover:text-yellow font-bold" />
const Iframe = (props) => (
    <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
        <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
)
const InlineCode = (props) => (
    <code {...props} className="dark:bg-[#4c3e62] dark:text-white bg-[#e8e8e8] text-inherit p-1 rounded" />
)
const Blockquote = (props) => <blockquote {...props} className="p-6 rounded bg-[#f0f0f0] dark:bg-[#371A51]" />

export default function Main({
    handleMobileMenuClick,
    filePath,
    title,
    lastUpdated,
    menu,
    slug,
    breadcrumb,
    breadcrumbBase,
    hideAnchor,
    tableOfContents,
    body,
    next,
    previous,
}) {
    const components = {
        a: A,
        iframe: Iframe,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        ...shortcodes,
    }
    const breakpoints = useBreakpoint()
    const showToc = !hideAnchor && tableOfContents?.length
    const mainEl = useRef()
    return (
        <div className="relative">
            <div className="dark:text-white flex max-w-screen-2xl mx-auto items-start relative z-10">
                <MainSidebar
                    mainEl={mainEl}
                    menu={menu}
                    slug={slug}
                    className="hidden md:block flex-1 sticky top-4 w-full transition-opacity md:opacity-60 hover:opacity-100"
                />
                <main ref={mainEl} className={`relative md:pl-16 xl:px-16 2xl:px-32 ${showToc ? '' : 'flex-grow'}`}>
                    <article className="2xl:max-w-[800px] xl:max-w-[650px] max-w-full pb-14">
                        <section className="mb-8 xl:mb-14 relative">
                            <h1 className="dark:text-white text-5xl mt-0 mb-2">{title}</h1>
                            <p className=" mt-1 mb-0">
                                Last updated: <time>{lastUpdated}</time>
                            </p>
                        </section>
                        {breakpoints.lg && showToc && (
                            <InternalSidebar
                                className="bg-gray-accent-light dark:bg-gray-accent-dark p-4 rounded dark:bg-opacity-10 mb-10"
                                tableOfContents={tableOfContents}
                            />
                        )}
                        <section className="article-content">
                            <MDXProvider components={components}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </section>
                        {showToc && (
                            <div
                                style={{ height: 'calc(100% - 35vh)' }}
                                className="border-r-2 border-dashed border-gray-accent-light dark:border-gray-accent-dark absolute bottom-0  right-0 hidden xl:flex justify-center"
                            />
                        )}
                        {next && (
                            <SectionLinks
                                previous={previous}
                                next={next}
                                hideAnchor={!showToc}
                                breakpoints={breakpoints}
                            />
                        )}
                    </article>
                </main>
                {!breakpoints.lg && showToc && (
                    <InternalSidebar
                        className="flex-1 sticky top-4 mt-[35vh] mb-14 hidden xl:block"
                        tableOfContents={tableOfContents}
                    />
                )}
            </div>
        </div>
    )
}
