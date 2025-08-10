<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>File</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Import .SRT</NavigationMenuLink>
          <NavigationMenuLink>Export as .SRT</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Video</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Upload</NavigationMenuLink>
          <NavigationMenuLink>Use external url</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
        <NavigationMenuItem>
        <NavigationMenuTrigger>Project</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Settings</NavigationMenuLink>
          <NavigationMenuLink>Delete</NavigationMenuLink>
        </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>