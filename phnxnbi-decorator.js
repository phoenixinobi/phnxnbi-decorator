/*
 * phnxnbi-decorator (phnxnbi-decorator.js)
 * v1.0.0
 * (c) phoenixinobi - 2014.
 * https://github.com/phoenixinobi/phnxnbi-decorator/
 */

var CollapsibleDecorator = function () {
    var intContainer;
    var imagesFolderDefault = "../images/";
    var spacerImageFileDefault = "spacer.png";
    var expandImageFileDefault = "expand.png";
    var collapseImageFileDefault = "collapse.png";
    var leafImageFileDefault = "leaf.png";

    function DecorateContainer(container) {
        GetUnorderedLists(container).each(function () {
            DecorateUnorderedList(this);
        });
    }

    function DecorateUnorderedList(ul) {
        RemoveBullets(ul);
        GetListItems(ul).each(function () {
            DecorateListItem(this);
        });
    }

    function DecorateListItem(li) {
        if (IsContainer(li)) {
            DecorateContainer(li);
            DecorateBranchListItem(li);
        }
        else {
            DecorateLeafListItem(li);
        }
    }

    function DecorateBranchListItem(li) {
        DecorateWithCollapsibleAttributes(li);
    }

    function DecorateLeafListItem(li) {
        DecorateWithLeafAttributes(li);
    }

    function RemoveBullets(ul) {
        $(ul).addClass("phnxnbi-decorator-ul-collapsible");
    }

    function DecorateWithCollapsibleAttributes(li) {
        $(li).prepend(GetSpacerImage());
        $(li).prepend(GetCollapsibleWidget(GetCollapseImage()));
    }

    function DecorateWithLeafAttributes(li) {
        $(li).prepend(GetSpacerImage());
        $(li).prepend(GetLeafImage());
    }

    function HandleCollapsibleCommand(widget) {
        var command = GetCollapsibleCommand(widget);
        if (command == "collapse") {
            CollapseBranch(widget);
        }
        else if (command == "expand") {
            ExpandBranch(widget);
        }
    }

    function CollapseBranch(branchWidget) {
        RemoveCollapsibleImage(branchWidget);
        AttachExpandImageCommand(branchWidget);
        $(branchWidget).parent().children('[collapsible-content!="false"]').each(function () {
            $(this).hide();
        });
    }

    function ExpandBranch(branchWidget) {
        RemoveCollapsibleImage(branchWidget);
        AttachCollapseImageCommand(branchWidget);
        $(branchWidget).parent().children('[collapsible-content!="false"]').each(function () {
            $(this).show();
        });
    }

    function AttachExpandImageCommand(widget) {
        $(widget).append(GetExpandImage());
    }

    function AttachCollapseImageCommand(widget) {
        $(widget).append(GetCollapseImage());
    }

    function GetSpacerImage() {
        var image = GetImage(GetImagesFolder() + GetSpacerImageFile(), 8, 16);
        $(image).attr("collapsible-content", "false");
        return image;
    }

    function GetExpandImage() {
        var image = GetImage(GetImagesFolder() + GetExpandImageFile(), 16, 16);
        $(image).attr("collapsible-command", "expand");
        return image;
    }

    function GetCollapseImage() {
        var image = GetImage(GetImagesFolder() + GetCollapseImageFile(), 16, 16);
        $(image).attr("collapsible-command", "collapse");
        return image;
    }

    function GetLeafImage() {
        var image = GetImage(GetImagesFolder() + GetLeafImageFile(), 16, 16);
        $(image).attr("collapsible-content", "false");
        return image;
    }

    function IsContainer(li) {
        return $(li).children().length > 0;
    }

    function RemoveCollapsibleImage(a) {
        GetCollapsibleImage(a).remove();
    }

    function GetCollapsibleWidget(image) {
        var a = document.createElement("a");
        $(a).css("cursor", "pointer");
        $(a).attr("collapsible-content", "false");
        $(a).append(image);
        $(a).click(function () {
            HandleCollapsibleCommand(this);
        });
        return a;
    }

    function GetImagesFolder() {
        var imagesFolder = $(intContainer).attr("img-folder");
        if (imagesFolder != null && imagesFolder != "")
            return imagesFolder;
        else
            return imagesFolderDefault;
    }

    function GetSpacerImageFile() {
        var spacerImageFile = $(intContainer).attr("img-spacer");
        if (spacerImageFile != null && spacerImageFile != "")
            return spacerImageFile
        else
            return spacerImageFileDefault;
    }

    function GetExpandImageFile() {
        var expandImageFile = $(intContainer).attr("img-expand");
        if (expandImageFile != null && expandImageFile != "")
            return expandImageFile
        else
            return expandImageFileDefault;
    }

    function GetCollapseImageFile() {
        var collapseImageFile = $(intContainer).attr("img-collapse");
        if (collapseImageFile != null && collapseImageFile != "")
            return spacerImageFile
        else
            return collapseImageFileDefault;
    }

    function GetLeafImageFile() {
        var leafImageFile = $(intContainer).attr("img-leaf");
        if (leafImageFile != null && leafImageFile != "")
            return spacerImageFile
        else
            return leafImageFileDefault;
    }

    function GetImage(path, width, height) {
        var image = new Image(width, width);
        image.src = path;
        return image;
    }

    function GetUnorderedLists(container) {
        return $(container).children("ul");
    }

    function GetListItems(ul) {
        return $(ul).children("li");
    }

    function GetActionAttribute(li) {
        return $(li).attr("action");
    }

    function GetLiteral(li) {
        return $(li).contents().filter(function () {
            return this.nodeType === 3; 
        });
    }

    function GetCollapsibleCommand(a) {
        return GetCollapsibleImage(a).attr("collapsible-command");
    }

    function GetCollapsibleImage(a) {
        return $(a).children("img");
    }

    this.Decorate = function (container) {
        intContainer = container;
        DecorateContainer(container);
    }
};

$(document).ready(function () {
    $('div[phnxnbi-decorator-ul="collapsible"]').each(function () {
        var container = this;
        var decorator = new CollapsibleDecorator();
        decorator.Decorate(container);
    });
});
