<script lang="ts">
    import { onMount } from "svelte";
    import type { History } from "$lib/types/history";
    import TerminalScreen from "./(components)/TerminalScreen.svelte";
    import TerminalInput from "./(components)/TerminalInput.svelte";
    import GitHubCorner from "./(components)/GitHubCorner.svelte";

    import git from "$lib/commands/git";
    import blog from "$lib/commands/blog";
    import home from "$lib/commands/home";
    import menu from "$lib/commands/menu";
    import about from "$lib/commands/about";
    import error from "$lib/commands/error";
    import resume from "$lib/commands/resume";
    import version from "$lib/commands/version";
    import twitter from "$lib/commands/twitter";
    import linkedin from "$lib/commands/linkedin";
    import projects from "$lib/commands/projects";

    let history: History[] = $state( [] );
    let userInput: string = $state( "" );
    let historyIndex: number = $state( 0 );
    let terminalInput: HTMLElement | undefined = $state();

    const addToHistory = ( type: string, text: string ) =>
    {
        history = [ ...history, { id: history.length, text, type } ];
    };

    const addQueuedOutput = async ( output: string | string[] ) =>
    {
        if ( Array.isArray( output ) )
        {
            await Promise.all(
                output.map( ( line, index ) => new Promise( ( resolve ) =>
                {
                    setTimeout( () =>
                    {
                        addToHistory( "output", line );
                        resolve( undefined );
                    }, 15 * index );
                } ) )
            );
        }
        else
        {
            addToHistory( "output", output );
        }
    };

    const parseCommand = ( command: string, internal?: boolean ) =>
    {
        let output;

        switch ( command )
        {
            case "git":
                output = git;
                break;

            case "blog":
                output = blog;
                break;

            case "home":
                output = internal ? home : undefined;
                break;

            case "ls":
            case "dir":
            case "menu":
                output = menu;
                break;

            case "about":
                output = about;
                break;

            case "error":
                output = internal ? error : undefined;
                break;

            case "resume":
                output = resume;
                break;

            case "version":
                output = version;
                break;

            case "projects":
                output = projects;
                break;

            case "linkedin":
                output = linkedin;
                break;

            case "twitter":
                output = twitter;
                break;

            default:
                break;
        }

        if ( !output )
        {
            output = [ `${ command }: command not found` ];
        }

        if ( !Array.isArray( output ) )
        {
            output = [ output ];
        }

        return output.map( ( line ) => line
            .replace( /\t/g, "    " )
            .replace( / /g, "&nbsp;" )
            .replace( /\n/g, "<br>" )
            .replace( /\r\n/g, "<br>" )
            .replace(
                /<color="(.*?)">(.*?)<\/color>/g,
                "<span class='color-$1'>$2</span>"
            )
            .replace(
                /<link="(.*?)">(.*?)<\/link>/g,
                "<a href='$1' target='_blank'>$2</a>"
            ) );
    };

    const handleEnter = ( input: string ) =>
    {
        if ( !input )
        {
            return;
        }

        addToHistory( "input", input );

        const command = input.toLocaleLowerCase().trim();
        const output = parseCommand( command );

        switch ( command )
        {
            case "clear": {
                history = [];
                break;
            }

            default: {
                if ( command.length && output )
                {
                    addQueuedOutput( output );
                }

                break;
            }
        }

        historyIndex = history.length;
    };

    const historyBackwards = () =>
    {
        for ( let index = historyIndex - 1; index >= 0; index-- )
        {
            if ( history[ index ].type === "input" )
            {
                userInput = history[ index ].text;
                historyIndex = index;
                break;
            }
        }
    };

    const historyForwards = () =>
    {
        for (
            let index = historyIndex + 1;
            index < history.length - 1;
            index++
        )
        {
            if ( history[ index ].type === "input" )
            {
                userInput = history[ index ].text;
                historyIndex = index;
                break;
            }
        }
    };

    onMount( () =>
    {
        const media = window.matchMedia( "(max-width: 1024px)" );

        if ( media.matches && terminalInput )
        {
            addQueuedOutput( parseCommand( "error", true ) );
            terminalInput.style.display = "none";
            return;
        }

        if ( !history.length )
        {
            addQueuedOutput( parseCommand( "home", true ) );
        }

        historyIndex = history.length;
    } );

    $effect( () =>
    {
        if ( history )
        {
            terminalInput?.scrollIntoView( { block: "end" } );
        }
    } );
</script>

<main>
    <GitHubCorner />
    <TerminalScreen {history} />
    <TerminalInput
        {userInput}
        bind:terminalInput
        enter={handleEnter}
        {historyForwards}
        {historyBackwards}
    />
</main>

<style>
    main {
        height: 100%;
        overflow-y: auto;
        scrollbar-width: none;
    }
</style>
