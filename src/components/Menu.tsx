const navigation = [
    { name: 'Todo', href: '#', current: true },
    { name: 'LaLiga', href: '#', current: false },
    { name: 'LaLiga 2', href: '#', current: false },
    { name: 'Champions League', href: '#', current: false },
    { name: 'Premier League', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Menu = () => (

    <nav className="sticky top-24 space-y-1" aria-label="Navegación Principal" itemScope itemType="https://schema.org/SiteNavigationElement">
        <ul>
            {navigation.map((item) => (
                <li key={item.name}>
                    <a
                        itemProp="url"
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-emerald-900 text-white font-medium' : 'text-gray-600 hover:bg-emerald-800 hover:text-white',
                            'group flex items-center px-3 py-2 text-md font-regular rounded-sm'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <span className="truncate">{item.name}</span>
                    </a>
                </li>
            ))}
        </ul>
    </nav>

)

export default Menu